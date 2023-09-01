import { SystemEvent } from './system-event';

interface ApplicationCloseContext {
  applicationId: string;
}

export class ApplicationCloseEvent extends SystemEvent<ApplicationCloseContext> {
  public static readonly ID = 'application-close';

  constructor(context: ApplicationCloseContext) {
    super(context);
  }
}
