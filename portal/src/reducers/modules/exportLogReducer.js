import * as queryString from "querystring";

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
        type: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
};

export default function (state = initialState, action) {
}

// Return only available search params
function getSearchQueryParams(searchData) {
    return {
        per_page: searchData.pageSize,
        page: searchData.current,
        id: searchData.id,
        type: searchData.name,
        sort: searchData.sort,
        order: searchData.order
    }
}