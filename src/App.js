import React, {useEffect, useState} from 'react';
import './index.scss';
import Success from './components/Success';
import {Users} from './components/Users';


function App() {
    const [users, setUsers] = useState([])
    const [invite, setInvite] = useState([])
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetch("https://reqres.in/api/users").then((res) => res.json()).then((json) => {
            setUsers(json.data)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка при получении пользователя')
        }).finally(() => setIsLoading(false))
    }, [])
    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const onClickInvite = (id) => {
        if (invite.includes(id)) {
            setInvite(prev => prev.filter(_id => _id !== id))
        } else {
            setInvite(prev => [...prev, id])
        }
    }

    const onClickSentInvites = () => {
        setSuccess(true)
    }
    return (
        <div className="App">
            {
                success ? (<Success count={invite.length}/>) : (
                    <Users invite={invite} onclickInvite={onClickInvite} searchValue={searchValue}
                           onChangeSearch={onChangeSearch} items={users} isLoading={isLoading}
                           onClickSentInvites={onClickSentInvites}/>)
            }


        </div>
    );
}

export default App;
