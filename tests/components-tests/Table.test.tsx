import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GridColDef } from '@mui/x-data-grid';
import { Table } from '../../src/components/ui/Table';

jest.useFakeTimers();

describe('Table', () => {
  it('[EMPTY] Should render', () => {
    expect(render(<Table columns={[]} rows={[]} />)).toBeTruthy();
  });

  it('[NO ROWS] Should render', () => {
    const columns: Array<GridColDef> = [
      {
        field: 'id',
      },
    ];
    expect(render(<Table columns={columns} rows={[]} />)).toBeTruthy();
  });

  it('[NO COLUMNS] Should render', () => {
    const rows: Array<{ id: string }> = [{ id: 'ID01' }];
    expect(render(<Table columns={[]} rows={rows} />)).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    const columns: Array<GridColDef> = [{ field: 'id' }];
    const rows: Array<{ id: string }> = [{ id: 'ID01' }];
    expect(render(<Table columns={columns} rows={rows} />)).toBeTruthy();
  });
});
