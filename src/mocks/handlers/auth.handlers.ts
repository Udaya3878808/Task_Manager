import {http,HttpResponse} from "msw";

interface LoginBody {
    userName: string;
    password: string;
  }
  
export const authHandlers = [
    http.post("/login", async({request}) => {
        const body = (await request.json()) as LoginBody;

        const { userName, password } = body;

        if(userName === "udaya" && password === "udaya123") {
            return HttpResponse.json({
                token: "fake-jwt-token",
                user: {
                  userName: userName
                }
              });
        }
        return new HttpResponse(null , {status:401})
    }),

    http.post("/logout", () => {
        return HttpResponse.json({ message: "Logged out successfully" });
      }),
]