const mockIslogin = {
  status: '200',
  data: {
    loggedIn: true,
    account: 'timlee0119',
    name: '李和維',
    teamName: 'NTUIM Test',
    auth: 1
  }
}

const mockGetAllTeam = {
  status: '200',
  data: {
    allTeams: [
      'NTUIM Basketball',
      'NTUIM Volleyball',
      'LA Lakers',
      'Boston Celtics',
      'Dallas Mavericks',
      'Atlanta Hawks'
    ]
  }
}

const mockGetTeam = {
  status: '200',
  data: {
    members: [
      {
        account: 'frank123',
        name: '陳漢威',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-11-07',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'L',
        auth: 1
      },
      {
        account: 'raywted',
        name: '林建鋐',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-01-12',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'S',
        auth: 1
      },
      {
        account: 'white123',
        name: '唐瑋廷',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-01-12',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'L',
        auth: 0
      },
      {
        account: 'cammy',
        name: '連冠旻',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-01-12',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'M',
        auth: 0
      },
      {
        account: 'secret888',
        name: '王予智',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-01-12',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'XL',
        auth: 0
      },
      {
        account: 'timlee0119',
        name: '李和維',
        sid: 'b05705025',
        pid: 'A123456789',
        birthdate: '1998-01-12',
        phoneNum: '0975123456',
        avatar: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        size: 'L',
        auth: 1
      },
    ]   
  }
}

const mockGetAnnouncement = {
  status: '200',
  data: {
    announcements: [
      {
        announceId: 0,
        date: '2019-01-13',
        author: '陳漢威',
        description: '幹你DB'
      },
      {
        announceId: 1,
        date: '2015-10-05',
        author: '林建鋐',
        description: '幹你DB3'
      },
      {
        announceId: 2,
        date: '2019-01-10',
        author: '李和維',
        description: '【球衣費用】\n下週五12/21前，請繳交 1680 元給我，匯款後拍收據給我，沒交隊費的人也請多匯給我 1000 元\n銀行代碼：008 華南銀行\n匯款帳號：125-200609532'
      }
    ]
  }
}

export { mockIslogin, mockGetTeam, mockGetAllTeam, mockGetAnnouncement };
