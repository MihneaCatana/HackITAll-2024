import {Office} from "../types/office.ts";

export const dataOffice: Office = {
    officeName: "Office 1",
    floors: [
        {
            id: 1,
            floorNumber: 1,
            rooms: [
                {
                    id: 1,
                    roomName: "Room 1",
                    devices: [
                        {
                            id: 1,
                            deviceName: "Refrigetator",
                            status: false,
                            consumption: 0,
                            timestamp: 1712406842
                        },
                        {
                            id: 2,
                            deviceName: "Light Bulb",
                            status: true,
                            consumption: 16,
                            timestamp: 1612406842
                        }
                    ]
                },
                {
                    id: 2,
                    roomName: "Room 2"
                },
                {
                    id: 3,
                    roomName: "Room 3"
                }, {
                    id: 7,
                    roomName: "Room 7"
                }
            ]
        },
        {
            id: 2,
            floorNumber: 2,
            rooms: [
                {
                    id: 4,
                    roomName: "Room 4"
                }, {
                    id: 5,
                    roomName: "Room 5"
                },
            ]
        },
        {
            id: 3,
            floorNumber: 3,
            rooms: [
                {
                    id: 6,
                    roomName: "Room 6"
                },
            ]
        }
    ]
}