import { test } from '@playwright/test';
import {checkSearchComponent} from './hfg-search-component.spec';
import {checkHeaderBackground} from './hfg-row-background.spec';

test.describe(checkHeaderBackground);
test.describe(checkSearchComponent);
