import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const base = 'https://api-m.sandbox.paypal.com';

@Controller('paypal')
export class PaypalController {
  private readonly clientId: string;
  private readonly clientSecret: string;
  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');
  }

  @Post('create-order')
  async createOrder(@Body() data: any) {
    try {
      return await this.createPaypalOrder(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post('capture-payment')
  async capturePayment(@Body() data: any) {
    try {
      return await this.capturePaypalPayment(data.orderId);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  // -------------------------------------------------------------------
  /**
   * Create an order to start the transaction.
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  async createPaypalOrder(data) {
    const accessToken = await this.generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: data.product.price,
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  /**
   * Capture payment for the created order to complete the transaction.
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  async capturePaypalPayment(orderID: string) {
    const accessToken = await this.generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return this.handleResponse(response);
  }

  /**
   * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
   * @see https://developer.paypal.com/api/rest/authentication/
   */
  async generateAccessToken() {
    try {
      if (!this.clientId || !this.clientSecret) {
        throw new Error('MISSING_API_CREDENTIALS');
      }
      const auth = Buffer.from(
        this.clientId + ':' + this.clientSecret,
      ).toString('base64');
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to generate Access Token:', error);
    }
  }

  async handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }
}
