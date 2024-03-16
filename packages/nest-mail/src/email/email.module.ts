import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransporterConfigOptions } from '../interfaces/transporter-config.interface';
import nodemailer from 'nodemailer';

@Module({})
export class EmailModule {
  static forRootAsync(options: TransporterConfigOptions): DynamicModule {
    return {
      module: EmailModule,
      global: true,
      imports: [
        MailerModule.forRootAsync({
          useFactory: () => {
            const transporter = nodemailer.createTransport({
              host: options.host,
              port: options.port,
              secure: !!options.secure, // Use `true` for port 465, `false` for all other ports
              auth: {
                user: options.authUser,
                pass: options.authPassword,
              },
            });

            return {
              transport: transporter,
              defaults: {
                from: 'Hello <modules@nestjs.com>',
              },
            };
          },
        }),
      ],
      // providers: [MailerService],
      // exports: [MailerService],
    };
  }
}
