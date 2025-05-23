import { z } from 'zod';

export const DeleteTagsRequestSchema = z.array(z.string());

export type DeleteTagsRequest = z.infer<typeof DeleteTagsRequestSchema>; 