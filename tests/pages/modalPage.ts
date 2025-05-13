import type { Page, Locator } from '@playwright/test';

export class ModalPage {
  readonly closeBtn: Locator;
  readonly modalDlg: Locator;

  constructor(public readonly page: Page) {
    this.closeBtn = this.page.getByLabel('Close');
    this.modalDlg = this.page.locator('[class="ant-modal-body"]');
  }
}
