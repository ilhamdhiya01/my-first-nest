import { Controller, Get } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/me')
  getMe() {
    return this.contactService.getMe();
  }
}
