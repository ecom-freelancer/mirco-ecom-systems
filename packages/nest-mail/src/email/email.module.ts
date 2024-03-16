import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransporterConfigOptions } from '../interfaces/transporter-config.interface';

@Module({})
export class EmailModule {
  static forRootAsync(options: TransporterConfigOptions): DynamicModule {
    return {
      module: EmailModule,
      global: true,
      imports: [
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              host: options.host,
              port: options.port,
              secure: !!options.secure, // Use `true` for port 465, `false` for all other ports
              auth: {
                user: options.authUser,
                pass: options.authPassword,
              },
            },
            defaults: {
              from: 'Hello <modules@nestjs.com>',
            },
          }),
        }),
      ],
    };
  }
}
