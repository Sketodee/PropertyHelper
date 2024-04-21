import React from 'react'

const TopProducts = () => {
    return (
        <div className="bg-white py-3 rounded-md shadow mb-6 px-3">
            <p className='text-customPrimary font-medium text-base '> Top Products </p>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                <thead
                                    className="border-b border-neutral-200 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-light text-gray-400">#</th>
                                        <th scope="col" className="px-6 py-4 font-light text-gray-400">Name</th>
                                        <th scope="col" className="px-6 py-4 font-light text-gray-400">Popularity</th>
                                        <th scope="col" className="px-6 py-4 font-light text-gray-400">Sales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="w-full h-1 bg-gray-200 rounded-full">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr
                                        className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-body-dark">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                        <div className="w-full h-1 bg-gray-200 rounded-full">
                                                <div className="h-full bg-red-500 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                    </tr>
                                    <tr
                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                        <div className="w-full h-1 bg-gray-200 rounded-full">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopProducts