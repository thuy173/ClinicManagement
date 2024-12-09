interface HeaderConfigItem {
  title: string
  path?: string
  children?: HeaderConfigItem[]
  description?: string
  icon?: string
}

const headerConfig: HeaderConfigItem[] = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: 'lni lni-home-2'
  },
  {
    title: 'Cá nhân',
    path: '/profile/setting',
    icon: 'lni lni-user-4'
  },
  {
    title: 'Yêu thích',
    path: '/library',
    icon: 'lni lni-heart',
    children: []
  },
  {
    title: 'Kiểm tra',
    path: '/level-choice',
    icon: 'lni lni-buildings-1'
  },

  {
    title: 'Phương pháp',
    path: '/approach',
    icon: 'lni lni-shield-2-check'
  }
]

export default headerConfig
