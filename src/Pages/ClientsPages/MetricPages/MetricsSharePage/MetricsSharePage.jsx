/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import ProgressSection from '../../../../Shared/ProgressSection/ProgressSection';
import ShowChart from '../../../../Shared/ShowChart/ShowChart';
import { FaChartBar } from 'react-icons/fa';
import Loading from '../../../../Shared/Loading/Loading';

const MetricsSharePage = ({ title, loading, metrics, metricsValue, addNewMetrics, updateMetrics }) => {
    return (
        <div className="h-auto ">
            <div className="grid grid-cols-3 gap-5">
                {loading ? (
                    <div className="col-span-2 border rounded-md">
                        <Loading />
                    </div>
                ) : (
                    <div className="col-span-2 border rounded-md ">
                        <div className="flex justify-between p-5">
                            <div>
                                <h2 className="text-2xl font-semibold">{title}</h2>
                                <h2>1M / 2M / 6M /1Y</h2>
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-green-400">20%</h2>
                                <h2>17.7%</h2>
                            </div>
                        </div>

                        <div className="px-8 pb-10">
                            {
                                metrics?.length ?
                                    <ShowChart data={metrics}></ShowChart>
                                    :
                                    <div className="flex justify-center items-center h-[250px]">
                                        <FaChartBar className="text-5xl text-gray-400" />
                                    </div>
                            }

                        </div>
                    </div>
                )}

                <div className="border rounded-md">
                    <div className="bg-slate-50 rounded-md">
                        <div className="flex justify-between items-center mx-4 py-3">
                            <h5 className="text-sm font-medium text-gray-500">Details</h5>
                        </div>
                        <hr className=" border-gray-300" />
                    </div>
                    <div className="p-4">all details</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 my-5">
                <div className="col-span-2 border rounded-md ">
                    <div className="bg-slate-50 rounded-md">
                        <div className="flex justify-between items-center mx-4 py-3">
                            <h5 className="text-base font-medium text-slate-700 ">
                                Progress
                            </h5>
                        </div>
                        <hr className=" border-gray-300" />
                        <ProgressSection
                            loading={loading}
                            addNewMetrics={addNewMetrics}
                            title={title}
                            metricsValue={metricsValue}
                            updateMetrics={updateMetrics}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricsSharePage;