export interface Device {
    id: number,
    deviceName: string,
    consumption: number,
    status?: boolean,
    timestamp: number
}