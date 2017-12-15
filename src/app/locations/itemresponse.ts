export interface ItemResponse {
length: number;
results: [Location]
}

export interface Location {
id: number;
latitude: number;
longitude: number
}