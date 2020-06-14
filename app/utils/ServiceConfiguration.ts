
export default interface ServiceConfiguration {

    setImageURL(imgURL: string): void;
    getName(): void;
    updateConfiguration(configuration: {}): void;
    getHeaders(): void;
    getURL(): void;
    getBody(): void;
    getHandleResponse(imgURLcorrespondingToResponse: string): void;
    

}