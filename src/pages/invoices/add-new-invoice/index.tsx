import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import LinkButton from "../../../components/button/linkButton";
import Search from "../../../components/inputs/search";
import TextInput from "../../../components/inputs/textInput";
import TextAreaInput from "../../../components/inputs/textArea";
import BinIcon from "../../../assets/icons/bin-icon";
import LoadingButton from "../../../components/button";
import PlusIcon from "../../../assets/icons/plus";
import ModalTemplate from "../../../components/modal";
import AddTax from "../../../components/tax/addTax";
import { addInvoiceToList } from "../../../stores/apiData/invoice/invoice-lists";

const breadCrumb = [
  {
    url: "/invoices/apartment",
    label: "Invoices",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "New Invoice",
    icon: "",
  },
];
export default function AddNewInvoice() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Invoice",
        pageDescription: "Add new invoice",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceSuffix, setInvoiceSuffix] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");

  //   service details
  const [serviceDetails, setServiceDetails] = useState([
    {
      id: "1",
      name: "",
      amount: "",
    },
  ]);

  const addNewService = useCallback(() => {
    setServiceDetails((prev) => [
      ...prev,
      {
        id: Math?.random()?.toString(36)?.substr(2, 9),
        name: "",
        amount: "",
      },
    ]);
  }, []);

  const handleServiceNameInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setServiceDetails((prev) => {
        const deepCopy = [...prev];
        deepCopy[index].name = e.target.value;
        return deepCopy;
      });
    },
    []
  );

  const handleServiceAmountInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setServiceDetails((prev) => {
        const deepCopy = [...prev];
        deepCopy[index].amount = e.target.value;
        return deepCopy;
      });
    },
    []
  );

  const remove = useCallback((index: number) => {
    setServiceDetails((prev) => {
      const deepCopy = [...prev];
      deepCopy.splice(index, 1);
      return deepCopy;
    });
  }, []);

  //   service taxes
  const [serviceTaxes, setServiceTaxes] = useState<
    { id: string; name: string; amount: string; isCompound: boolean }[]
  >([]);
  const [openAddTax, setOpenAddTax] = useState(false);

  const removeTax = useCallback((index: number) => {
    setServiceTaxes((prev) => {
      const deepCopy = [...prev];
      deepCopy.splice(index, 1);
      return deepCopy;
    });
  }, []);

  const addNewServiceTax = useCallback(
    (item: {
      id: string;
      name: string;
      amount: string;
      isCompound: boolean;
    }) => {
      setServiceTaxes((prev) => [
        ...prev,
        {
          id: item?.id,
          name: item?.name,
          amount: `${item?.amount}%`,
          isCompound: item?.isCompound,
        },
      ]);
    },
    []
  );

  // summary
  const [invoiceStartingNumber, setInvoiceStartingNumber] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  // final submit handler
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        dispatch(
          addInvoiceToList({
            id: "total-random",
            number: invoiceNumber,
            bookingId: "new-random",
            email: "new-email",
            createdOn: "today",
            createdBy: "admin",
            status: "confirmed",
          })
        );
      } catch (error) {
      } finally {
        setIsSaving(false);
      }
    },
    [invoiceNumber]
  );

  return (
    <>
      <section className="w-full flex flex-col items-center my-5">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-screen-xl flex flex-col gap-10"
        >
          {/* Customer Details */}
          <div className=" w-full flex flex-col items-center gap-4 border rounded-md">
            <div className=" w-full flex items-center justify-between gap-4 border-b p-3">
              <h4 className="text-lg font-semibold">Customer Details</h4>
              <div className=" w-fit">
                <LinkButton
                  url={`/add-customer/customer-details?redirect=${location?.pathname}`}
                  label="Create New User"
                  variant={2}
                />
              </div>
            </div>
            <div className="w-full p-3 flex flex-col gap-6 max-w-screen-md">
              <Search
                id="customer-search"
                placeholder="Existing Customer name, ID, etc..."
              />
            </div>
          </div>
          <div className=" w-full flex flex-col items-center gap-4 border rounded-md">
            {/* Invoice Details*/}
            <div className=" w-full flex items-center justify-between gap-4 border-b p-3">
              <h4 className="text-lg font-semibold">Invoice Details</h4>
            </div>
            <div className="w-full p-3 flex flex-col gap-6">
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={invoiceNumber}
                  setValue={setInvoiceNumber}
                  id="invoice-number"
                  placeholder="Entter Invoices Starting Number"
                />

                <div className="w-full flex items-stretch gap-3 p-1 px-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]">
                  <input
                    placeholder="Enter Number Suffix"
                    required={true}
                    value={invoiceSuffix}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setInvoiceSuffix(e.target.value)
                    }
                    type={"text"}
                    className=" w-full"
                  />
                  <div className="p-2 bg-gray-200 flex items-center whitespace-nowrap text-gray-400">
                    <span>/WEB</span>
                  </div>
                </div>
              </div>
              <TextAreaInput
                isRequired={true}
                value={companyInfo}
                setValue={setCompanyInfo}
                id="company-info-header"
                placeholder="Enter Company Information Header"
              />
            </div>
          </div>
          {/* service details */}
          <div className=" w-full flex flex-col items-center gap-4 border rounded-md">
            <div className=" w-full flex items-center justify-between gap-4 border-b p-3">
              <h4 className="text-lg font-semibold">Service Details</h4>
              <div className=" w-fit">
                <LoadingButton
                  type="button"
                  className=" text-primary"
                  isLoading={false}
                  label="Add Tax"
                  variant={2}
                  clickHandler={() => setOpenAddTax(true)}
                />
              </div>
            </div>
            <div className="w-full p-3 flex flex-col gap-6">
              {serviceDetails.map((item, index) => (
                <div
                  key={item?.id}
                  className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="w-full flex items-stretch gap-3">
                    <div className=" flex items-center gap-2">
                      <div className="p-2 px-6 bg-gray-200 rounded-md flex items-center text-gray-400">
                        <span>{index + 1}</span>
                      </div>
                      <button
                        title="delete-service"
                        onClick={() => remove(index)}
                        className=" text-red-500 hover:scale-110 transition-all"
                      >
                        <BinIcon />
                      </button>
                    </div>
                    <input
                      placeholder={"Enter Service Name"}
                      required={true}
                      value={item?.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleServiceNameInput(e, index)
                      }
                      type={"text"}
                      className="w-full p-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
                    />
                  </div>
                  <input
                    placeholder={"Enter Amount"}
                    required={true}
                    value={item?.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleServiceAmountInput(e, index)
                    }
                    type={"number"}
                    className="w-full p-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
                  />
                </div>
              ))}
              <div className="flex justify-end my-3">
                <div className=" w-fit">
                  <LoadingButton
                    type="button"
                    variant={3}
                    className=" text-primary"
                    isLoading={false}
                    label="Add New Service"
                    startIcon={<PlusIcon />}
                    clickHandler={() => addNewService()}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* added tax */}
          <div className=" w-full flex flex-col items-center gap-4 border rounded-md">
            <div className=" w-full flex items-center justify-between gap-4 border-b p-3">
              <h4 className="text-lg font-semibold">Tax Details</h4>
            </div>
            <div className="w-full p-3 flex flex-col gap-6">
              {serviceTaxes.map((item, index) => (
                <div
                  key={item?.id}
                  className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="w-full flex items-stretch gap-3">
                    <div className=" flex items-center gap-2">
                      <div className="p-2 px-6 bg-gray-200 rounded-md flex items-center text-gray-400">
                        <span>{index + 1}</span>
                      </div>
                      <button
                        title="delete-service"
                        onClick={() => removeTax(index)}
                        className=" text-red-500 hover:scale-110 transition-all"
                      >
                        <BinIcon />
                      </button>
                    </div>
                    <input
                      placeholder={"Enter Service Tax Name"}
                      required={true}
                      readOnly
                      value={item?.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleServiceNameInput(e, index)
                      }
                      type={"text"}
                      className="w-full p-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
                    />
                  </div>
                  <input
                    placeholder={"Enter Service Tax Amount"}
                    required={true}
                    readOnly
                    value={item?.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleServiceAmountInput(e, index)
                    }
                    type={"text"}
                    className="w-full p-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
                  />
                </div>
              ))}
              <div className="flex justify-end my-3">
                <div className=" w-fit">
                  <LoadingButton
                    type="button"
                    variant={3}
                    className=" text-primary"
                    isLoading={false}
                    label="Add New Service Tax"
                    startIcon={<PlusIcon />}
                    clickHandler={() => setOpenAddTax(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-4 my-10">
            <div className=" w-full grid grid-cols-2 gap-3">
              <h6 className=" font-semibold text-lg">Total Amount Paid:</h6>
              <TextInput
                inputType="text"
                isRequired={true}
                value={invoiceStartingNumber}
                setValue={setInvoiceStartingNumber}
                id="tax-starting-number"
                placeholder="Enter Invoice STarting Number"
              />
            </div>
            <div className=" w-full grid grid-cols-2 gap-3">
              <h6 className=" font-semibold text-lg">Note to Customer:</h6>
              <TextAreaInput
                isRequired={true}
                value={customerNote}
                setValue={setCustomerNote}
                id="customer-note"
                placeholder="Description"
              />
            </div>
          </div>

          {/* submit and cancel buttons */}
          <div className=" w-full flex justify-end mt-10">
            <div className=" flex items-center justify-between gap-4">
              <div className=" w-fit">
                <LinkButton url="/invoices" label="Cancel" variant={2} />
              </div>
              <div className=" w-fit">
                <LoadingButton
                  label="Save"
                  type="submit"
                  isLoading={isSaving}
                />
              </div>
            </div>
          </div>
        </form>
      </section>
      <ModalTemplate
        open={openAddTax}
        setOpen={setOpenAddTax}
        showXicon={true}
        title="Add Tax"
        className=" max-w-md"
      >
        <AddTax
          setOpen={setOpenAddTax}
          submitHandler={addNewServiceTax}
          isSubmitting={false}
          componentId="service-tax"
        />
      </ModalTemplate>
    </>
  );
}
