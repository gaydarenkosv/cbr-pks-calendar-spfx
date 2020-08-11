import { GroupingEventService, CategoryService, EventService, UserService, MaterialService, ActorService } from "../services/Services"
import * as moment from "moment";
import * as types from '../constants';
import FilterEvent from "../utils/IFilterEvent";
import { filterEventInit } from "../Reducers";
import Event from '../Models/Event';
import { sp } from '@pnp/sp/presets/all';
import pnp from 'sp-pnp-js';
import { IContextInfo } from '@pnp/sp/sites';


let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})


export const setAuth = (): any => {
  return async dispatch => {
    // sp.setup({
    //     sp: {
    //         baseUrl: 'http://sp2019/',
    //         headers: {
    //             Accept: 'application/json;odata=verbose'
    //         }
    //     }
    // });
    // sp.setup({
    //     spfxContext: this.context
    // });

    // console.log('payload', sp);
    // console.log('fetch', pnp.sp.web.currentUser);
    let web = pnp.sp.site.rootWeb;
    console.log('webSPUrl', web.toUrlAndQuery());
    try {
      sp.site.getContextInfo().then(ob => {
        const oContext: IContextInfo = ob;
        const siteUrl = oContext.SiteFullUrl;
        console.log(siteUrl);
        pnp.setup({ sp: { baseUrl: siteUrl } });
        pnp.sp.utility.getCurrentUserEmailAddresses().then(ob => {
          let curruser = ob;
          console.log(curruser);
          // let curProp = await pnp.sp.profiles.myProperties.get();
          // console.log(curProp);
          //let curruser = await sp.web.currentUser.get();
          //console.log(curruser.Email, curruser.Id, curruser.LoginName, curruser.Title, curruser.UserId, curruser.UserPrincipalName);

          web.currentUser.get().then(res => console.log(res)).catch(err => console.log(err));
        })
          .catch(err => console.log(err));
      })
        .catch(err => console.log(err));
    }
    catch (ex) {
      console.log(ex);
    }
    dispatch({
      type: 'SET_AUTH',
    });
  }
}

export const changeCalendarDate = (dateStart: Date, filterEvent: FilterEvent) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_DATE,
      payload: dateStart
    });
    filterEvent.selectedDate = dateStart;

    filterEvents(types.CHANGE_FILTER_EVENT_SUCCESS, filterEvent, dispatch);
  }
}

export const changeCalendarDateSuccess = events => ({
  type: types.CHANGE_DATE_SUCCESS,
  events
})

export const changeSelectedCategory = (categoryId: number, filterEvent: FilterEvent) => {
  let categories = filterEvent.selectedCategories;
  if (categories.indexOf(categoryId) >= 0) {
    categories = categories.filter(ob => ob !== categoryId);
  }
  else {
    categories.push(categoryId);
  }
  filterEvent.selectedCategories = categories;
  return dispatch => {
    dispatch({
      type: types.CHANGE_FILTER_EVENT,
      payload: filterEvent
    })

    filterEvents(types.CHANGE_FILTER_EVENT_SUCCESS, filterEvent, dispatch);
  }
}

export const initEvents = (): any => {
  return async dispatch => {
    console.log('init events');
    filterEvents(types.CHANGE_FILTER_EVENT_SUCCESS, filterEventInit, dispatch);
  }
}

export const infinityLoadEvents = (skip: number, filterEvent: any) => {
  return dispatch => {
    console.log('infinity load events', skip, filterEvent as FilterEvent);
    dispatch({
      type: types.CHANGE_FILTER_EVENT,
      payload: filterEvent
    });

    filterEvents(types.INFINITY_LOAD_EVENT_SUCCESS, filterEvent, dispatch, skip);
  }
}

export const editEvent = (editingEvent: Event) => {
  return dispatch => { //TODO: change to fetching, Event to number
    dispatch({
      type: types.RUN_EDIT_EVENT
    });
    if (editingEvent.id > 0) {
      EventService.getRecordById(editingEvent.id)
        .then(ob => {
          console.log('fetch', ob);
          dispatch({
            type: types.EDIT_EVENT,
            editEvent: ob,
          });
        })
        .catch(err => console.log(err));
    }
    else {
      dispatch({
        type: types.EDIT_EVENT,
        editEvent: editingEvent,
      });
    }
  }
}

export const clearEvents = () => ({
  type: types.CLEAR_EVENTS
})

export const closeEditEvent = () => ({
  type: types.CLOSE_EDIT_EVENT
})

export const saveEditEvent = (event: Event, filterEvent: FilterEvent) => {
  return dispatch => { //TODO: change to fetching, Event to number
    dispatch({
      type: types.SAVE_EDIT_EVENT
    });
    const saveFunc = (!event.id || event.id <= 0) ? EventService.add(event) : EventService.update(event, event.id);
    saveFunc
      .then(ob => {
        console.log('save ', ob);
        dispatch({
          type: types.SAVE_EDIT_EVENT_SUCCESS,
        });
        dispatch(clearEvents());
        filterEvents(types.CHANGE_FILTER_EVENT_SUCCESS, filterEvent, dispatch);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.SAVE_EDIT_EVENT_SUCCESS,
        });
      });
  }
}


function filterEvents(typeAction: string, filterEvent: FilterEvent, dispatch: any, skip?: number) {
  let date = moment(filterEvent.selectedDate);
  const day = date.date() > 9 ? date.date() : '0' + date.date();
  const months = date.months() + 1;
  const month = months > 9 ? months : '0' + months;
  const filterCategories = filterEvent.selectedCategories.length > 0 ? `&categories=${filterEvent.selectedCategories.join(',')}` : '';
  const skipRequest = skip ? `&skip=${skip}` : '';
  GroupingEventService.searchGet(`/?startDate=${day}.${month}.${date.years()}${filterCategories}${skipRequest}`)
    .then(ob => {
      console.log('fetch', ob);
      dispatch({
        type: typeAction,
        payload: ob,
      });
    })
    .catch(err => console.log(err));
}

export const getCategories = (): any => {
  return async dispatch => {
    dispatch({
      type: types.GET_CATEGORIES,
    });
    CategoryService.findAll()
      .then(ob => {
        console.log('fetch categories', ob);
        dispatch({
          type: types.GET_CATEGORIES_SUCCESS,
          payload: ob,
        });
      })
      .catch(err => console.log(err));
  }
}

export const getUsers = (): any => {
  return async dispatch => {
    dispatch({
      type: types.GET_USERS,
    });
    UserService.findAll()
      .then(ob => {
        console.log('fetch users', ob);
        dispatch({
          type: types.GET_USERS_SUCCESS,
          payload: ob,
        });
      })
      .catch(err => console.log(err));
  }
}

export const getCategoriesSuccess = categories => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload: categories
})

export const getParticipantsByEvent = (event: Event) => {
  return dispatch => {
    dispatch({
      type: types.GET_EVENT_PARTICIPANTS,
      payload: event
    });
    getEventParticipants(types.GET_EVENT_PARTICIPANTS_SUCCESS, event, dispatch);
  }
}

export const infinityLoadEventParticipants = (skip: number, event: Event) => {
  return dispatch => {
    console.log('infinity load ', skip, event);
    dispatch({
      type: types.GET_EVENT_PARTICIPANTS,
      payload: event
    });

    getEventParticipants(types.INFINITY_LOAD_EVENT_PARTICIPANTS_SUCCESS, event, dispatch, skip);
  }
}

function getEventParticipants(typeAction: string, event: Event, dispatch: any, skip?: number) {
  const skipRequest = skip ? `&skip=${skip}` : '';
  const take = 10;
  const takeRequest = `&take=${take}`;
  ActorService.searchGet(`/?eventId=${event.id}${takeRequest}${skipRequest}`)
    .then(ob => {
      console.log('fetch', ob);
      dispatch({
        type: typeAction,
        payload: ob,
        isFetchingFull: ob.length < take
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CLOSE_EVENT_PARTICIPANTS
      })
    });
}

export const getMaterialsByEvent = (event: Event) => {
  return dispatch => {
    dispatch({
      type: types.GET_EVENT_MATERIALS,
      payload: event
    });
    getEventMaterials(types.GET_EVENT_MATERIALS_SUCCESS, event, dispatch);
  }
}

export const infinityLoadEventMaterials = (skip: number, event: Event) => {
  return dispatch => {
    console.log('infinity load ', skip, event);
    dispatch({
      type: types.GET_EVENT_MATERIALS,
      payload: event
    });

    getEventMaterials(types.INFINITY_LOAD_EVENT_MATERIALS_SUCCESS, event, dispatch, skip);
  }
}

function getEventMaterials(typeAction: string, event: Event, dispatch: any, skip?: number) {
  const skipRequest = skip ? `&skip=${skip}` : '';
  const take = 30;
  const takeRequest = `&take=${take}`;
  MaterialService.searchGet(`/?eventId=${event.id}${takeRequest}${skipRequest}`)
    .then(ob => {
      console.log('fetch', ob);
      dispatch({
        type: typeAction,
        payload: ob,
        isFetchingFull: ob.length < take
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CLOSE_EVENT_MATERIALS
      })
    });
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const EventFilters = {
  SHOW_ALL: 'SHOW_ALL'
}

export const setEditMode = (value) => {
  return {
    type: types.SET_EDIT_MODE,
    value
  }
}
