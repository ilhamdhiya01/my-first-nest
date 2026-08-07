import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, ContactModule, AddressModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
