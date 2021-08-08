import { ADD_WIDGET } from "../graphql";
import { EDIT_WIDGET } from "../graphql/widget.gql";
import { createApolloClient } from "../lib/apollo";
import { CreateWidgetInput, UpdateWidgetInput, Widget } from "./schema";
import { GqlResponse } from "./User";

let client;
export class Widgets{
    constructor(token: string){
        client = createApolloClient(token);
    }

    public createWidget = async ({
        input,
      }: {
        input: CreateWidgetInput;
      }): Promise<GqlResponse<Widget>> => {
        try {
          const data = await client.mutate({
            mutation: ADD_WIDGET,
            variables: {
                createWidgetInput: input as CreateWidgetInput,
            },
          });
    
          if (!data.data.createWidget) {
            console.error(data);
            return Promise.reject<GqlResponse<Widget>>({
              data: null,
              error: data,
              status: false,
            });
          }
          return Promise.resolve<GqlResponse<Widget>>({
            data: data.data.createWidget,
            error: null,
            status: true,
          });
        } catch (error) {
          console.error(error);
          return Promise.reject<GqlResponse<Widget>>({
            data: null,
            error: error,
            status: false,
          });
        }
      };

      public updateWidget = async ({
        input,
        widgetId
      }: {
        input: UpdateWidgetInput;
        widgetId:string;
      }): Promise<GqlResponse<Widget>> => {
        try {
          const data = await client.mutate({
            mutation: EDIT_WIDGET,
            variables: {
                updateWidgetInput: input as UpdateWidgetInput,
                widgetId: widgetId
            },
          });
    
          if (!data.data.updateWidget) {
            console.error(data);
            return Promise.reject<GqlResponse<Widget>>({
              data: null,
              error: data,
              status: false,
            });
          }
          return Promise.resolve<GqlResponse<Widget>>({
            data: data.data.updateWidget,
            error: null,
            status: true,
          });
        } catch (error) {
          console.error(error);
          return Promise.reject<GqlResponse<Widget>>({
            data: null,
            error: error,
            status: false,
          });
        }
      };
}