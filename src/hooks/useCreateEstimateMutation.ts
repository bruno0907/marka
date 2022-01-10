import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";

import { OrderItemProps } from "../types"

import { Estimate } from "./useEstimatesQuery";

export type EstimateStatus = 'Pendente' | 'Aprovado' | 'Não aprovado'

export type CreateEstimate = {  
  user_id: string; 
  numero_orcamento: number;
  cliente: string;   
  produtos: OrderItemProps[];   
  total: number;
  observacoes: string;
  status: EstimateStatus;
  descricao_status: string;
  status_data_aprovado: Date;
}

const createEstimate = async (estimate: CreateEstimate) => { 
  return await supabase
    .from<Estimate>('estimates')
    .insert(estimate);
}

const useCreateEstimateMutation = () => useMutation(
  async (newEstimate: CreateEstimate) => {
    try {
      const { data, error } = await createEstimate(newEstimate)
  
      if(error) throw Error('Erro ao cadastrar novo orçamento.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['estimate[]']),
    onError: error => console.log('New Estimate Mutation Error: ', error)
  }
)

export {
  useCreateEstimateMutation
}
