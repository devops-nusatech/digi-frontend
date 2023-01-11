import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-scroll';
import { Table } from '../../../../../../components';

interface ItemInterface {
    item: any;
}

export const ResponsesItem: React.FC<ItemInterface> = (props: ItemInterface) => {
    const { item } = props;
    const intl = useIntl();

    const getTableHeaders = React.useCallback(() => {
        return [
            intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.responses.table.header.code' }),
            intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.responses.table.header.description' }),
            intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.responses.table.header.schema' }),
        ];
    }, [intl]);

    const getTableData = React.useCallback(() => {
        return Object.keys(item.responses).map(key => {
            const response = item.responses[key];
            const getFormattedSchema = () => {
                if (response?.schema?.type === 'array') {
                    if (response.schema.items && response.schema.items.$ref) {
                        const refElements = response.schema.items.$ref.split('/');
                        const linkTitle = refElements[refElements.length - 1];

                        return (
                            <div>
                                <span>[&nbsp;</span>
                                <Link smooth to={`models/${linkTitle}`}>
                                    {linkTitle}
                                </Link>
                                <span>&nbsp;]</span>
                            </div>
                        );
                    } else {
                        return response.type;
                    }
                } else if (response?.schema?.$ref) {
                    const refElements = response.schema.$ref.split('/');
                    const linkTitle = refElements[refElements.length - 1];

                    return (
                        <Link smooth to={`models/${linkTitle}`}>
                            {linkTitle}
                        </Link>
                    );
                } else {
                    return intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.responses.table.data.noSchema' });
                }
            };

            return [
                key,
                response.description,
                getFormattedSchema(),
            ];
        });
    }, [item.responses, intl]);

    if (item.responses && Object.keys(item.responses).length) {
        return (
            <>
                <div className="font-medium flex justify-between w-1/6">
                  <div className="">{intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.responses.title' })}</div>
                  <div>:</div>
                </div>
                <div className="h-[1px] bg-neutral6 w-full rounded-xl" />
                <Table
                    header={getTableHeaders()}
                    data={getTableData()}
                />
            </>
        );
    }

    return null;
};
