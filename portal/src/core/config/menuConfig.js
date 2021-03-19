export default [
    {
        title: 'My Tickets',
        key: '/my-ticket',
        icon: 'QuestionOutlined',
        isLevel: true
    },
    {
        title: 'List of tickets issued me',
        key: '/issued-me-ticket',
        icon: 'UnorderedListOutlined',
        isLevel: true

    },
    {
        title: 'My Staff',
        key: '/staff-ticket',
        icon: 'UnorderedListOutlined',
        isLevel: true

    },
    {
        title: 'List of all tickets',
        key: '/list-ticket',
        icon: 'GlobalOutlined',
        isLevel: true
    },
    {
        title: 'Analytic Charts',
        key: '/analytic-chart',
        icon:  'PieChartOutlined',
        isLevel: true
    },
    {
        title: 'Settings',
        key: '',
        icon: 'SettingOutlined',
        isLevel: false,
        children: [
            {
                title: 'Role',
                key: '/role',
                icon: 'LockOutlined',
                isLevel: true
            },
            {
                title: 'User',
                key: '/user',
                icon: 'UserOutlined',
                isLevel: true
            },
            {
                title: 'Department',
                key: '/department',
                icon: 'GroupOutlined',
                isLevel: true
            }, {
                title:'Issue',
                key: '/issue',
                icon: 'ExclamationOutlined',
                isLevel: true
            },
            {
                title: 'Ip Restrictions',
                key: '/ip',
                icon: 'SafetyOutlined',
                isLevel: true
            }
        ]
    },
]