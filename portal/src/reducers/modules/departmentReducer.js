const initialState = {
    data: [],
    searchParams: {
        loading: false,
        count: null,
        per_page: 10,
        current: 1,
        total: null,
        pageSize: 10,
        id: '',
        name: '',
        type: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
    users: [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}