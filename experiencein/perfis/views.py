from django.shortcuts import render, redirect
from perfis.models import Perfil, Convite
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, response, status, exceptions
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .serializers import PerfilSerializer, PerfilSimplificadoSerializer, ConviteSerializer


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer

    def get_serializers_class(self):
        if self.request.method == 'GET':
            return PerfilSimplificadoSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if self.request.method == 'POST':
            return (AllowAny(),)
        return super().get_permissions()


@api_view(['GET'])
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def get_convites(request, *args, **kwargs):
    perfil_logado = get_perfil_logado(request)
    convites = Convite.objects.filter(convidado=perfil_logado)
    serializer = ConviteSerializer(convites)
    return response.Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def convidar(request, *args, **kwargs):
    try:
        perfil_a_convidar = Perfil.objects.get(id=kwargs['perfil_id'])
    except:
        raise exceptions.NotFound(
            'Não foi encontrado um perfil com o ID informado.')
    perfil_logado = get_perfil_logado(request)
    if perfil_a_convidar != perfil_logado:
        perfil_logado.convidar(perfil_a_convidar)
        return response.Response({'Mensagem:' f'Convite enviado com sucesso para {perfil_a_convidar.email}.'}, status=status.HTTP_201_CREATED)
    raise exceptions.ParseError('Você não pode realizar esse convite.')


@api_view(['POST'])
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def aceitar(request, *args, **kwargs):
    perfil_logado = get_perfil_logado(request)
    try:
        convite = Convite.objects.filter(
            conviado=perfil_logado).get(id=kwargs['convite_id'])
    except:
        raise exceptions.NotFound(
            f'Não foi encontrado um convite com o ID informado.')
    convite.aceitar()
    return response.Response({'Mensagem': 'Convite aceito com sucesso'},
                             status=status.HTTP_201_CREATED)


@api_view(['GET'])
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def get_meu_perfil(request, *args, **kwargs):
    perfil_logado = get_perfil_logado(request)
    serializer = PerfilSerializer(perfil_logado)
    return response.Response(serializer.data, status=status.HTTP_200_OK)


def get_perfil_logado(request):
    return request.user.perfil
