import { TestBed } from '@angular/core/testing';

import { GameStoreService } from './game.store.service';

describe('Game.StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStoreService = TestBed.get(GameStoreService);
    expect(service).toBeTruthy();
  });
});
