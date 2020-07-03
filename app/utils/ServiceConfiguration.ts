//  import { Path } from "history"; // What is this?
import Path from '../components/Path'

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