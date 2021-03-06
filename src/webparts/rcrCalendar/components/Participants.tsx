import * as React from 'react';
import Participant from './Participant';
import { UserService } from '../services/Services';
import User from '../Models/User';
import Actor from '../Models/Actor';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';

const Participants = () => {

    const actors: Actor[] = useSelector(state => state.viewEvent.actors as Actor[]);
    const participants: User[] = useSelector(state => (state.viewEvent.actors as Actor[]).map(ob => ob.user));
    const isFetching: boolean = useSelector(state => state.viewEvent.isFetching as boolean);

    return (
        <Spin spinning={isFetching}>
            <div className='participants'>
                {participants.map((p) => (
                    <Participant userInfo={p} key={`eventUser_${p.login}`}></Participant>
                ))}
            </div >
        </Spin>
    );
}

export default Participants