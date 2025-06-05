// 'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge
} from '@tremor/react';

const users: {
  id: string;
  name: string;
  email: string;
  github: string; 
}[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alicejohnson@gmail.com',
    github: 'alicejohnson',
  }, 
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bobsmit@gmail.com',
    github: 'bobsmit',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charliebrown@gmail.com',
    github: 'charliebrown',
  },
];

export function ListOfUsers() {
  return (
    <> 
      <Title>
        Usuarios
        <Badge> {users.length}</Badge>
      </Title>
      <Table className="mt-8"  style={{ width: '600px' }} >
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              Id
            </TableHeaderCell>
            <TableHeaderCell>
              Nombre
            </TableHeaderCell>
            <TableHeaderCell>
              Email
            </TableHeaderCell> 
            <TableHeaderCell>
              Acciones
            </TableHeaderCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.name} >
              <TableCell>
                {item.id}
              </TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <img style={{ width: '32px', height: '32px', borderRadius: '100%'}} src={`https://unavatar.io/github/${item.github}`} alt={item.name} />
                {item.name}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <button type='button' style={{ marginRight: '8px' }}>
                  Editar
                </button>
                <button type='button' style={{ marginRight: '8px' }}>
                  Eliminar
                </button>  
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}