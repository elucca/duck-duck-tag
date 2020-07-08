//  import { Path } from "history"; // What is this?
//  See https://fullstackopen.com/osa7/react_router#use-history for history
import { Path } from '../types'

export default interface ServiceConfiguration {

    setImagePath(imgPath: Path): void;
    getName(): string;
    updateConfiguration(configuration: {}): void;
    getHeaders(): object;
    getURL(): string;
    getBody(): object;
    getParams(): object;
    getHandleResponse(imgURLcorrespondingToResponse: string): any; // What's the appropriate type for this?
    

}