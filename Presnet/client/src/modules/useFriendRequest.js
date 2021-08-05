import { useCallback, useEffect, useState, createContext, useContext, useMemo } from 'react';
import { GetFriendRequest } from "./friendManager";

export const FriendRequestContext = createContext({})

export const FriendRequestProvider = ({ isLoggedIn, ...rest }) => {
    const [countFriendRequests, setCountFriendRequests] = useState(0);
    const [friendRequests, setFriendRequests] = useState([]);

    const loadFriendRequests = useCallback(async () => {
        GetFriendRequest()
            .then((data) => {
                setFriendRequests(data)
                setCountFriendRequests(data.length)
            });
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            loadFriendRequests()
        }
    }, [loadFriendRequests, isLoggedIn])
    const friendRequestDataValue = useMemo(() => ({ countFriendRequests, friendRequests, loadFriendRequests }), [countFriendRequests, friendRequests, loadFriendRequests])
    return <FriendRequestContext.Provider value={friendRequestDataValue} {...rest} />
}
export const useFriendRequests = () => useContext(FriendRequestContext)
