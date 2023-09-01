import { SystemEvent } from './system-event';

interface ApplicationLaunchContext {
  name: string;
}

export class ApplicationLaunchEvent extends SystemEvent<ApplicationLaunchContext> {
  public static readonly ID = 'application-launch';

  constructor(context: ApplicationLaunchContext) {
    super(context);
  }
}
