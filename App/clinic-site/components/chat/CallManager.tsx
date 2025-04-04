'use'
import { CallData, IncomingCall, SystemUser } from '@/types/chat';
import { useState, useRef, useEffect } from 'react';
import Peer, { SignalData, Instance } from 'simple-peer';
import { Socket } from 'socket.io-client';

interface CallManagerProps {
  currentChat: SystemUser;
  socket: Socket;
  currentUser: SystemUser;
}

const CallManager: React.FC<CallManagerProps> = ({ currentChat, socket, currentUser }) => {
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'active' | 'ended'>('idle');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Instance | null>(null);

  // Initialize media streams and socket listeners
  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Failed to get media devices', err);
      }
    };

    setupMedia();

    // Socket event listeners
    socket.on('incoming-call', (data: IncomingCall) => {
      setIncomingCall(data);
      setCallStatus('ringing');
    });

    socket.on('call-accepted', () => {
      setCallStatus('active');
    });

    socket.on('call-rejected', () => {
      setCallStatus('ended');
      resetCall();
    });

    socket.on('webrtc-signal', handleSignal);

    return () => {
      socket.off('incoming-call');
      socket.off('call-accepted');
      socket.off('call-rejected');
      socket.off('webrtc-signal');
      endCall();
    };
  }, []);

  const startCall = async () => {
    if (!localStream) return;

    const roomId = `call_${currentUser.user_id}_${currentChat.user_id}_${Date.now()}`;
    setIsCalling(true);
    setCallStatus('ringing');

    socket.emit('start-call', {
      roomId,
      callerId: currentUser.user_id,
      calleeId: currentChat.user_id,
      callerName: currentUser.name
    } as CallData);

    initPeerConnection(roomId, true);
  };

  const acceptCall = () => {
    if (!incomingCall || !localStream) return;

    socket.emit('accept-call', { roomId: incomingCall.roomId });
    initPeerConnection(incomingCall.roomId, false);
    setCallStatus('active');
    setIncomingCall(null);
    setIsCalling(true);
  };

  const rejectCall = () => {
    if (!incomingCall) return;

    socket.emit('reject-call', { callerId: incomingCall.callerId });
    setIncomingCall(null);
    setCallStatus('ended');
    resetCall();
  };

  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    setRemoteStream(null);
    setIsCalling(false);
    setCallStatus('idle');
    
    // Notify the other peer
    socket.emit('end-call');
  };

  const initPeerConnection = (roomId: string, isInitiator: boolean) => {
    if (!localStream) return;

    const peer = new Peer({
      initiator: isInitiator,
      stream: localStream,
      trickle: false
    });

    peer.on('signal', (data: SignalData) => {
      socket.emit('webrtc-signal', { roomId, signal: data });
    });

    peer.on('stream', (stream: MediaStream) => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    peer.on('close', endCall);
    peer.on('error', (err) => {
      console.error('Peer error:', err);
      endCall();
    });

    peerRef.current = peer;
  };

  const handleSignal = (data: { signal: SignalData }) => {
    if (peerRef.current) {
      peerRef.current.signal(data.signal);
    }
  };

  const resetCall = () => {
    setTimeout(() => {
      setCallStatus('idle');
      setIsCalling(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Call Status Indicator */}
      <div className={`mb-2 p-2 rounded-md text-center text-sm font-medium ${
        callStatus === 'ringing' ? 'bg-yellow-100 text-yellow-800' :
        callStatus === 'active' ? 'bg-green-100 text-green-800' :
        callStatus === 'ended' ? 'bg-red-100 text-red-800' :
        'hidden'
      }`}>
        {callStatus === 'ringing' && isCalling && 'Đang gọi...'}
        {callStatus === 'ringing' && !isCalling && 'Cuộc gọi đến'}
        {callStatus === 'active' && 'Cuộc gọi đang diễn ra'}
        {callStatus === 'ended' && 'Cuộc gọi đã kết thúc'}
      </div>

      {/* Video Container */}
      {(isCalling || callStatus === 'active') && (
        <div className="relative w-80 h-60 bg-black rounded-lg overflow-hidden shadow-xl">
          {remoteStream && (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {localStream && (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute bottom-2 right-2 w-24 h-18 rounded-md border-2 border-white"
            />
          )}
        </div>
      )}

      {/* Call Controls */}
      <div className="mt-3 flex gap-2 justify-center">
        {callStatus === 'idle' && (
          <button
            onClick={startCall}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
            disabled={!currentChat.user_id}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
            Gọi Video
          </button>
        )}

        {(callStatus === 'active' || (callStatus === 'ringing' && isCalling)) && (
          <button
            onClick={endCall}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1a1 1 0 10-2 0v8a1 1 0 102 0V6zm-5 0a1 1 0 10-2 0v8a1 1 0 102 0V6z" clipRule="evenodd" />
            </svg>
            Kết thúc
          </button>
        )}

        {callStatus === 'ringing' && incomingCall && !isCalling && (
          <>
            <button
              onClick={acceptCall}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Nhận cuộc gọi
            </button>
            <button
              onClick={rejectCall}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Từ chối
            </button>
          </>
        )}
      </div>

      {/* Incoming Call Notification */}
      {incomingCall && callStatus === 'ringing' && !isCalling && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <div className="mb-4 text-xl font-semibold">Cuộc gọi từ {incomingCall.callerName}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={acceptCall}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Nhận cuộc gọi
              </button>
              <button
                onClick={rejectCall}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallManager;