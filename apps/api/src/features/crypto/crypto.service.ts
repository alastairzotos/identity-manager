import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import * as aes from 'aes-js';
import * as bcrypt from 'bcrypt';
import { EnvironmentService } from "environment/environment.service";

@Injectable()
export class CryptoService {
  constructor(
    private readonly envService: EnvironmentService,
  ) {}

  randomHex(length: number) {
    return randomBytes(length).toString('hex');
  }

  encrypt(value: string) {
    const key = this.getEncryptionKey();

    const bytes = aes.utils.utf8.toBytes(value);

    const aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
    const encryptedBytes = aesCtr.encrypt(bytes);

    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

    return encryptedHex;
  }

  decrypt(cipher: string) {
    const key = this.getEncryptionKey();

    const encryptedBytes = aes.utils.hex.toBytes(cipher);

    const aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private getEncryptionKey() {
    return aes.utils.hex.toBytes(this.envService.get().aesKey);
  }
}

