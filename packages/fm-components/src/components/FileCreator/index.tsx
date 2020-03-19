import { Field, Formik, Form as FForm } from 'formik';
import React, { useState } from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { ModalProps, withModal } from '../../elements/withModal';
import { FileType, getTodayDate } from '../../types';

import { Container, Error, Form, Toggle, Top } from './styles';

interface IProps extends ModalProps, NavContextProps {
  children?: JSX.Element;
  isSubmitting?: boolean;
  onAdd?: (file: FileType) => void;
  onClose?: Function;
}

function FileCreatorComp(_props: IProps) {
  const [isDir, setIsDir] = useState(false);

  return (
    <Container>
      <Top>
        <Toggle.Container>
          <Toggle.Option className={!isDir ? 'selected' : ''} onClick={() => setIsDir(false)}>
            文件
          </Toggle.Option>
          <Toggle.Option className={isDir ? 'selected' : ''} onClick={() => setIsDir(true)}>
            文件夹
          </Toggle.Option>
        </Toggle.Container>
      </Top>

      {!isDir && _props.renderAddFileElement ? (
        _props.renderAddFileElement({ onClose: _props.onClose })
      ) : (
        <Formik
          initialValues={{
            isDir,
            name: '',
            creatorName: '',
            date: getTodayDate()
          }}
          validate={values => {
            const errors: Record<string, string> = {};
            if (!values.name) {
              errors.name = 'Name is Required';
            }
            return errors;
          }}
          onSubmit={values => {
            _props.onAdd({
              ...values,
              isDir
            });

            console.log(11);

            _props.onClose();
          }}
        >
          {(props: any) => (
            <FForm>
              <Form.Container>
                <div className="formField">
                  <Field
                    placeholder="Name"
                    onChange={props.handleChange}
                    name="name"
                    className="field"
                    value={props.values.name}
                    autoComplete="off"
                  />
                  {props.errors.name && props.touched.name ? (
                    <Error>{props.errors.name}</Error>
                  ) : (
                    ''
                  )}
                </div>

                <div className="formField">
                  <Field
                    placeholder="Creator"
                    onChange={props.handleChange}
                    name="creatorName"
                    className="field"
                    value={props.values.creatorName}
                    autoComplete="off"
                  />
                  {props.errors.creatorName && props.touched.creatorName ? (
                    <Error>{props.errors.creatorName}</Error>
                  ) : (
                    ''
                  )}
                </div>

                <div className="formField">
                  <Field
                    placeholder="date"
                    type="date"
                    onChange={props.handleChange}
                    name="date"
                    className="field"
                    value={props.values.date}
                  />
                </div>

                <Form.Submit
                  type="submit"
                  disabled={!props.dirty && !props.isSubmitting}
                  className={!props.dirty && !props.isSubmitting ? 'disabled' : ''}
                >
                  创建
                </Form.Submit>
              </Form.Container>
            </FForm>
          )}
        </Formik>
      )}
    </Container>
  );
}

export const FileCreator = withModal<IProps>(withContext(FileCreatorComp))({});
