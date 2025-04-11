
import { SuiEvent } from '@mysten/sui/client';
import { prisma, Prisma } from '../db';

export const handleHeroEvents = async (events: SuiEvent[], type: string) => {
  const eventsByType = new Map<string, any[]>();
  
  for (const event of events) {
    if (!event.type.startsWith(type)) throw new Error('Invalid event module origin');
    const eventData = eventsByType.get(event.type) || [];
    eventData.push(event.parsedJson);
    eventsByType.set(event.type, eventData);
  }

  await Promise.all(
    Array.from(eventsByType.entries()).map(async ([eventType, events]) => {
      const eventName = eventType.split('::').pop() || eventType;
      switch (eventName) {
        case 'HeroEvent':
          // TODO: handle HeroEvent
          await prisma.heroEvent.createMany({
            data: events as Prisma.HeroEventCreateManyInput[],
          });
          console.log('Created HeroEvent events');
          break;
        case 'TakeFeesEvent':
          // TODO: handle TakeFeesEvent
          await prisma.takeFeesEvent.createMany({
            data: events as Prisma.TakeFeesEventCreateManyInput[],
          });
          console.log('Created TakeFeesEvent events');
          break;
        default:
          console.log('Unknown event type:', eventName);
      }
    }),
  );
};
