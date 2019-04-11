import * as types from '../constants/actionTypes';

const initialState = {
  codeInput: '',
  dataResults: {
    'Database Requests': null,
    'Data Points': null,
    'Nesting Depth': null,
    'Effective Runtime': null,
  },
  dataVis: {
    resolverNum: null,
    resolverNames: [],

    results: {},
    visObj: {}
  },
  networkLatency: null,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.UPDATE_CODE_INPUT:
      return {
        ...state,
        codeInput: action.payload
      }

    case types.BUILD_TREE_VIS:
      return {
        ...state,
        dataVis: {
          ...state.dataVis,
          visObj: action.payload
        }
      }

    case types.STORE_RESPONSE_DATA:
      return {
        ...state,
        dataVis: {
          ...state.dataVis,
          results: action.payload
        }
      }

    case types.SET_DATABASE_REQUESTS:
      return {
        ...state,
        dataResults: {
          ...state.dataResults,
          'Database Requests': action.payload
        }
      }

    case types.SET_DATA_POINTS:
      return {
        ...state,
        dataResults: {
          ...state.dataResults,
          'Data Points': action.payload
        }
      }

    case types.SET_NESTING_DEPTH:
      return {
        ...state,
        dataResults: {
          ...state.dataResults,
          'Nesting Depth': action.payload
        }
      }

    case types.SET_NETWORK_LATENCY:
      return {
        ...state,
        networkLatency: action.payload
      }

    case types.SET_EFFECTIVE_RUNTIME:
      return {
        ...state,
        dataResults: {
          ...state.dataResults,
          'Effective Runtime': action.payload
        }
      }

    case types.SET_RESOLVER_NUM:
      return {
        ...state,
        dataVis: {
          ...state.dataVis,
          resolverNum: action.payload
        }
      }

    case types.SET_RESOLVER_NAMES:
      return {
        ...state,
        dataVis: {
          ...state.dataVis,
          resolverNames: action.payload
        }
      }

    default:
      return state;
  }
}

export default appReducer;
