import { Body, Controller, Get, Inject, Param, Patch, ValidationPipe, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST)
    private readonly request: Request, // THIS HAS PERFORMANCE IMPACT SINCE EACH REQUEST WILL INSTANCE A REQUEST INSTANCE
  ){}

  @Get()
  @Public()
  async find(@Protocol() protocol: string){
    console.log('protocol: ' + protocol);
    //await new Promise(resolve => setTimeout(resolve, 5000));
    return this.userService.find();
  }

 
  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.find();
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body(ValidationPipe) body: any){
    throw new NotFoundException('adfaf');
  }

}
