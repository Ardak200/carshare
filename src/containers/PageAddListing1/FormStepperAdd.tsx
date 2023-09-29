import React, {useEffect, useState} from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {CarModule, FileImageType, UserProfileProp} from "../../data/types";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing4 from "./PageAddListing4";
import {getCarModelById, getCarModels} from "../../axios/lib/rent/references";
import PageAddListing7 from "./PageAddListing7";
import PageAddListing10 from "./PageAddListing10";
import {addCarPost, addImageForCarPost, editCarById, getCarById, getCarPost} from "../../axios/lib/rent/carModule";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import {FileValidated} from "@dropzone-ui/react";
import {Modal} from "../../shared/draftExistModal/Modal";
import PageAddListing1_2 from "./PageAddListing1_2";
import FormStepperHeader from "./FormStepperHeader";
import { ToastContainer } from "react-toast";
import {errorMessage, successMessage} from "../../utils/toastMessage";
import {useTranslation} from "react-i18next";
import {carPostAddValidationError} from "../../utils/carSearchParamConvert";
import {defaultCarModule} from "../../utils/otherDefaultValues.";
import {useHistory, useParams} from "react-router-dom";
import {postOrEdit} from "../../axios/lib/rent/userProfile";
import {convertUrlToBlob} from "../../utils/convertUrlToBlob";

export interface CommonLayoutProps {
    nextBtnText?: string;
}

interface IParams {
    id:string
}

const CommonLayout: FC<CommonLayoutProps> = ({
                                                 nextBtnText,
                                             }) => {
    const [step,setStep] = useState(1);
    const [loading,setLoading] = useState(false);
    const [carPost,setCarPost] = useState<CarModule>(defaultCarModule)
    const [typeOfCar,setTypeOfCar] = useState<[]>([]);
    const [typeOfModule,setTypeOfModule] = useState<[]>([])
    const [draftExist,setDraftExist] = useState(false);
    const [files,setFiles] = useState<FileValidated[]>([])
    const [submitSuccess,setSubmitSuccess] = useState(true);
    const {token,user} = useAuth();

    const [userProfile,setUserProfile] = useState<UserProfileProp>({
        userId:user.id||"",
        name:user.firstName+" " + user.lastName + " " + user.lastName,
        userName:user.username||"",
        email:user.email||"",
        address:carPost.cityName||""
    })
    const {t} = useTranslation();
    const {id} = useParams<IParams | any>();
    let history = useHistory();
    const editPage = () => {
        if(id) {
            if(user.id == carPost.createdByUser) {
                return true;
            } else {
                history.push("/")
                return false;
            }

        } else {
            return false;
        }
    }

    useEffect(() => {
        getCarModels().then(res=> {
            setTypeOfCar(res.data)
        })
        setDefaultCarModule();
    },[])

    const setDefaultCarModule = () => {
        if(editPage()) {
            getCarById(id).then(res=> {
                setCarPost(res.data)
                setStep(3)
            })
        }
        let carPostStorage = localStorage.getItem("carPost");
        let stepStorage = localStorage.step;
        let typeofLocal = typeof carPostStorage
        if(carPostStorage != null && !editPage()) {
            if( typeofLocal !== undefined || true) {
                let postStorage = JSON.parse(localStorage.getItem("carPost") || "");
                setCarPost(postStorage)
                setTimeout(() => {
                    getCarModelById(postStorage.carModel).then(res=> {
                        setTypeOfModule(res.data)
                    })
                },100)
            }
        }

        if(!id && stepStorage !== null && typeof stepStorage !== undefined && !isNaN(stepStorage)) {
            setStep(parseInt(stepStorage))
        }
    }
    useEffect(() => {
        let carPostStorage = localStorage.getItem("carPost");
        let typeofLocal = typeof carPostStorage
        if(carPostStorage != null && !editPage()) {
            if( typeofLocal !== undefined || true) {
                setDraftExist(true)
            }
        }
    }, []);

    const addUser = () => {
        postOrEdit(userProfile)
    }

    const onSubmit = () => {
        let error = carPostAddValidationError(carPost);
        if(error) {
            errorMessage(error);
        } else {
            setLoading(true)

            addCarPost(carPost,token).then(res=> {
                if(files) {
                    addImageForCarPost(res.data.id,files,token).then(res=> {
                    })
                }
                addUser()
                setStep(step+1)
                localStorage.removeItem("carPost");
                localStorage.removeItem("step");

            }).catch(e => {
                setLoading(false)
            });
        }
    }

    const onEdit = () => {
        let error = carPostAddValidationError(carPost);
        if(error) {
            errorMessage(error);
        } else {
            setLoading(true)

            editCarById(id,carPost).then(res=> {
                if(files) {
                    addImageForCarPost(id,files,token).then(res=> {
                        setLoading(false)
                    })
                }
                addUser();
                successMessage("Запись успешно обновлена")
                setTimeout(() => {
                    history.push("/account-savelists")
                },300)
                setLoading(false)


            }).catch(e => {
                setLoading(false)
            });
        }
    }

    useEffect(() => {
        window.scroll(0,0)
        if(!editPage() && step != 5) {
            localStorage.step = step;
        }
        if(!editPage() && step == 5) {
            localStorage.removeItem("step")
        }
    },[step])

    const stepChangeHeader = (stepVal:number) => {
        if(stepVal == 2 && carPost.carModel== ""){
            errorMessage(t("formStepper.modelRequired"))
        } else if((stepVal == 3 || stepVal == 4) && (carPost.carModel == "" || carPost.model == "")) {
            errorMessage(t("formStepper.carAndModelRequired"))
        } else {
            setStep(stepVal)
        }
    }

    const Stepper = () => {
        if(step == 1) {
            return (
                <>
                    <PageAddListing1
                        typeOfCar={typeOfCar}
                        carModule={carPost}
                        setCarModule={setCarPost}
                        step={step}
                        setStep={setStep}
                        setTypeOfModules={setTypeOfModule}
                        typeOfModules={typeOfModule}
                    />
                </>
            )
        }else if(step == 2) {
            return (
                <>
                    <PageAddListing1_2
                        typeOfCar={typeOfCar}
                        carModule={carPost}
                        setCarModule={setCarPost}
                        step={step}
                        setStep={setStep}
                        setTypeOfModules={setTypeOfModule}
                        typeOfModules={typeOfModule}
                    />
                </>
            )
        }

        else if(step ==3) {
            return (
                <>
                    <PageAddListing4 carModule={carPost} step={step} setStep={setStep} editPage={editPage()}/>
                </>
            )
        } else if(step == 4) {
            return (
                <>
                    <PageAddListing7 files={files} setFile={setFiles} carModule={carPost} editPage={editPage()} />
                </>
            )
        }else if(step == 5) {
            return (
                <>
                    <PageAddListing10/>
                </>
            )
        }
        else {
            return (
                <div>{step}</div>
            )
        }

    }
    return (
        <div
            className={`nc-PageAddListing1 px-4 max-w-7xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
            data-nc-id="PageAddListing1"
        >
            <ToastContainer delay={3000} />
            <Modal isOpen={draftExist} setIsOpen={setDraftExist} carModule={carPost} setStep={setStep} setCarModule={setCarPost} />
            <div className="space-y-11">
                <h2 className="text-2xl font-semibold">{id ? "Редактировать объявление" : "Подать объявление"}</h2>
                {step !== 5  &&
                    <FormStepperHeader
                        editPage = {editPage()}
                        step={step}
                        setStep={setStep}
                        activeMarkaName={carPost.modelName}
                        activeModelName={carPost.carModelName}
                        clickStepper={stepChangeHeader}
                    />}
                <div>
                    <span className="text-lg text-neutral-500 dark:text-neutral-400">

          </span>
                </div>
                {/* --------------------- */}
                <div className="listingSection__wrap ">
                    <Stepper />
                </div>
                {/* --------------------- */}

                <div className="flex justify-end space-x-5">
                    {step && step != 4 && step != 5 && <ButtonPrimary onClick={() => (stepChangeHeader(step+1))}>
                        Дальше
                    </ButtonPrimary> }
                    {!editPage() && step === 4 && <ButtonPrimary loading={loading} onClick={() => onSubmit()} >
                        {nextBtnText || "Добавить"}
                    </ButtonPrimary>}
                    {editPage() && step === 4 && <ButtonPrimary loading={loading} onClick={() => onEdit()} >
                        {nextBtnText || "Редактировать"}
                    </ButtonPrimary>}
                </div>
            </div>
        </div>
    );
};

export default CommonLayout;
