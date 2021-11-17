import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'
import { CreateSupplierForm } from './CreateSupplierForm'

export default function NewSupplier() {
  return (
    <>
      <Head>
        <title>MARCA | Novo Fornecedor</title>        
      </Head>
      <Authenticated>
        <Header title="Novo Fornecedor" withGoBack/>
        <Divider />
        <Content>
          <CreateSupplierForm />
        </Content>
      </Authenticated>
    </>
  )
}