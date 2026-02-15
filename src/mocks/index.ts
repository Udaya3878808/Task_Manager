import {authHandlers} from "./handlers/auth.handlers"
import {taskHandlers} from "./handlers/task.handlers"


export const handlers = [
    ...authHandlers,
    ...taskHandlers,
];