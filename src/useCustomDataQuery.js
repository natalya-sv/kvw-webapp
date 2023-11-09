import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "./services/api";

const useCustomDataQuery = ({ fetchData, tag }) => {
  const {
    data,
    isLoading: fetchingData,
    isError: errorFetching,
    error: fetchingErrorMessage,
  } = useGetDataQuery({
    fetchData,
    tag,
  });

  const [
    updateData,
    {
      isLoading: isUpdating,
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorMessage,
    },
  ] = useUpdateDataMutation();

  const [
    createData,
    {
      isLoading: isCreating,
      isSuccess: successCreating,
      isError: errorCreating,
      error: creatingErrorMessage,
    },
  ] = useCreateDataMutation();

  const [
    deleteData,
    {
      isLoading: isDeleting,
      isSuccess: successDeleting,
      isError: errorDeleting,
      error: deletingErrorMessage,
    },
  ] = useDeleteDataMutation();
  const isError =
    errorFetching || errorCreating || errorUpdating || errorDeleting;

  const errorMessage =
    fetchingErrorMessage ||
    creatingErrorMessage ||
    updatingErrorMessage ||
    deletingErrorMessage;

  const isLoading = isUpdating || isCreating || isDeleting;

  return {
    data,
    isError,
    errorMessage,
    isLoading,
    successCreating,
    successUpdating,
    successDeleting,
    updateData,
    createData,
    deleteData,
    fetchingData,
  };
};

export default useCustomDataQuery;
