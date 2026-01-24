import { TestBed } from '@angular/core/testing';
import { TeamDetails } from '../../components/team-details/team-details';

//import { TeamDetails } from './team-details';

describe('TeamDetails', () => {
  let service: TeamDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
