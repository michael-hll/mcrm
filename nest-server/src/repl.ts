import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    await repl(AppModule);
}

bootstrap(); 

// use reple from terminal:
/*
>> npm run start -- --entryFile repl

Then you can use it like this:
eg: update an existing user record:
>> await get("UserRepository").update({id: 1}, {role: 'regular'})
*/