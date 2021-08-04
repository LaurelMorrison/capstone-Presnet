import { useCallback, useEffect, useState, createContext, useContext, useMemo } from 'react';
import { GetFriendRequest } from "./friendManager";

export const FriendRequestContext = createContext({})

export const FriendRequestProvider = (props) => {
    const [countFriendRequests, setCountFriendRequests] = useState(0);
    const [friendRequests, setFriendRequests] = useState([]);

    const loadFriendRequests = useCallback(async () => {
        GetFriendRequest()
            .then((data) => {
                setFriendRequests(data)
                setCountFriendRequests(data.length)
            });
    }, [])

    useEffect(() => { loadFriendRequests() }, [loadFriendRequests])
    const friendRequestDataValue = useMemo(() => ({ countFriendRequests, friendRequests, loadFriendRequests }), [countFriendRequests, friendRequests, loadFriendRequests])
    return <FriendRequestContext.Provider value={friendRequestDataValue} {...props} />
}
export const useFriendRequests = () => useContext(FriendRequestContext)
