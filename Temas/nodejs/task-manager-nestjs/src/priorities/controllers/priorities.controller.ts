import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrioritiesService } from '../services/priorities.service';
import { PriorityDto } from '../dto/priority.dto';

@Controller('priorities')
export class PrioritiesController {
    constructor(private readonly priorityService: PrioritiesService) { }

    @Get('list-priorities')
    listPriorities() {
        return this.priorityService.getAllPriorities();
    }

    @Get('list-priority/:id')
    listPriorityById(@Param('id', new ParseIntPipe()) id: number) {
        return this.priorityService.getPriorityById(id);
    }

    @Post('add-priority')
    @UsePipes(new ValidationPipe())
    addPriority(@Body() priority: PriorityDto) {
        return this.priorityService.addPriority(priority);
    }

    @Put('update-priority/:id')
    updatePriority(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() priority: PriorityDto) {
        return this.priorityService.updatePriority(id, priority);
    }

    @Delete('delete-priority/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePriority(@Param('id') id: number) {
        return this.priorityService.deletePriority(id);
    }

    @Get('query')
    search(@Query() query) {
        return `Usted buscó ${JSON.stringify(query)}`;
    }
}
