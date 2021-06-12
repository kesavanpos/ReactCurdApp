import { fetchUser } from "../actions/user";
import { UserDataService } from "../services/user.service"

test('deleteTodo deletes the todo it is given', () => {    
    const res = await UserDataService.getAll();
    console.log(res);
    expect(res).not.toBe([]);
  });