import { SetMetadata } from '@nestjs/common';

export const MappingPublicKey = 'isPublic';
export const MappingPublic = () => SetMetadata(MappingPublicKey, true);
