import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;
}

export class WithMeta {
  @ApiProperty()
  meta: Meta;
}
