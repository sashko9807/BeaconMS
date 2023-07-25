export const endpoints = {
    auth: {
        refresh: { url: 'auth/refreshToken', method: 'POST' }
    },
    user: {
        register: { url: 'user/register', method: 'POST' },
        login: { url: 'user/login', method: 'POST' },
        updatePassword: (userId) => { return { url: `user/${userId}/`, method: 'PUT' } },
        forgottenPassword: (email) => { return { url: `user/forgotPassword/${email}`, method: 'PUT' } }
    },
    beacon: {
        addBeacon: { url: 'beacon', method: 'POST' },
        editBeacon: (beaconId) => { return { url: `beacon/${beaconId}/edit`, method: 'PUT' } },
        getBeacons: (buildingId) => { return { url: `beacon/${buildingId}`, method: 'GET' } },
        deleteBeacon: (beaconId) => { return { url: `beacon/${beaconId}/delete`, method: 'DELETE' } }
    },
    buildings: {
        addBuilding: { url: 'building', method: "POST" },
        getBuildings: { url: 'building', method: 'GET' }
    }

}